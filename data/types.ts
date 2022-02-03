export type Task = {
	id: string;
	text: string;
	belongsTo: string;
};

export type TaskGroup = {
	id: string;
	title: string;
	tasks: Task[];
};
