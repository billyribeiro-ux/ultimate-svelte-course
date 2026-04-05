import type { LayoutServerLoad } from './$types';

/**
 * Server-side stub for the (course) layout. Manifest loading happens in
 * +layout.ts via import.meta.glob so it works on edge and Tauri. Keep this
 * file as a placeholder for future auth/session concerns.
 */
export const load: LayoutServerLoad = async () => {
	return {};
};
