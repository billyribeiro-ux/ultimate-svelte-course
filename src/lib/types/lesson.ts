export interface LessonMeta {
	id: string;
	moduleId: string;
	number: string;
	title: string;
	subtitle?: string;
	conceptTags: readonly string[];
	prerequisites: readonly string[];
	estMinutes: number;
	learningObjectives: readonly string[];
}

export interface ModuleMeta {
	id: string;
	title: string;
	subtitle: string;
	order: number;
	colorToken: `--module-${string}`;
	lessons: readonly LessonMeta[];
}

export interface LessonRef {
	id: string;
	moduleId: string;
	number: string;
	title: string;
	href: string;
}
