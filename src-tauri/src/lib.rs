// Ultimate Svelte Course — Tauri 2.x entry point.
//
// This module boots a Tauri application that launches the SvelteKit
// adapter-node build as a sidecar process (compiled via `bun build --compile`
// into `src-tauri/binaries/usc-server-<triple>`). On startup we:
//
//   1. Pick an unused localhost port via `portpicker::pick_unused_port()`.
//   2. Spawn the `usc-server` sidecar with env vars `PORT`, `HOST`, `ORIGIN`,
//      `NODE_ENV` so adapter-node binds to the chosen port and accepts the
//      WKWebView's origin.
//   3. Stream the sidecar's stdout until we see the `Listening on` line
//      emitted by adapter-node, then build the main `WebviewWindow` pointed at
//      `http://127.0.0.1:<port>` via `WebviewUrl::External`.
//   4. Store the `CommandChild` handle in Tauri-managed state so we can send
//      SIGTERM on window `Destroyed`, letting adapter-node drain in-flight
//      requests and emit `sveltekit:shutdown` before exiting.

use std::sync::Mutex;

use tauri::{Manager, TitleBarStyle, WebviewUrl, WebviewWindowBuilder, WindowEvent};
use tauri_plugin_shell::{process::{CommandChild, CommandEvent}, ShellExt};

/// Managed state wrapping the sidecar child so we can kill it on window close.
struct SidecarChild(Mutex<Option<CommandChild>>);

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .setup(|app| {
            let port = portpicker::pick_unused_port().expect("no free localhost port available");
            let origin = format!("http://127.0.0.1:{port}");

            let sidecar_command = app
                .shell()
                .sidecar("usc-server")
                .expect("failed to resolve usc-server sidecar")
                .env("PORT", port.to_string())
                .env("HOST", "127.0.0.1")
                .env("ORIGIN", &origin)
                .env("NODE_ENV", "production");

            let (mut rx, child) = sidecar_command
                .spawn()
                .expect("failed to spawn usc-server sidecar");

            app.manage(SidecarChild(Mutex::new(Some(child))));

            let handle = app.handle().clone();
            tauri::async_runtime::spawn(async move {
                let mut window_built = false;
                while let Some(event) = rx.recv().await {
                    match event {
                        CommandEvent::Stdout(line) => {
                            let text = String::from_utf8_lossy(&line);
                            eprintln!("[usc-server] {text}");
                            if !window_built && text.contains("Listening on") {
                                let url = origin
                                    .parse()
                                    .expect("failed to parse sidecar origin URL");
                                let build_result = WebviewWindowBuilder::new(
                                    &handle,
                                    "main",
                                    WebviewUrl::External(url),
                                )
                                .title("Ultimate Svelte Course")
                                .inner_size(1400.0, 900.0)
                                .min_inner_size(1024.0, 700.0)
                                .title_bar_style(TitleBarStyle::Overlay)
                                .hidden_title(true)
                                .accept_first_mouse(true)
                                .visible(true)
                                .build();

                                if let Err(err) = build_result {
                                    eprintln!("failed to build main webview window: {err}");
                                } else {
                                    window_built = true;
                                }
                            }
                        }
                        CommandEvent::Stderr(line) => {
                            let text = String::from_utf8_lossy(&line);
                            eprintln!("[usc-server:err] {text}");
                        }
                        CommandEvent::Terminated(payload) => {
                            eprintln!("[usc-server] terminated: {:?}", payload);
                            break;
                        }
                        _ => {}
                    }
                }
            });

            Ok(())
        })
        .on_window_event(|window, event| {
            if let WindowEvent::Destroyed = event {
                if let Some(state) = window.app_handle().try_state::<SidecarChild>() {
                    if let Ok(mut guard) = state.0.lock() {
                        if let Some(child) = guard.take() {
                            // SIGTERM — adapter-node handles `sveltekit:shutdown`
                            // and drains in-flight requests before exiting.
                            let _ = child.kill();
                        }
                    }
                }
            }
        })
        .run(tauri::generate_context!())
        .expect("error while running Ultimate Svelte Course tauri application");
}
