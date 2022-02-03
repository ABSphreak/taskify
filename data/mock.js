import { v4 as uuidv4 } from 'uuid';

export const mockGroups = [
	{
		id: uuidv4(),
		title: 'Backlog',
		tasks: [
			{
				id: uuidv4(),
				text: 'Task 1',
				belongsTo: 'Backlog',
			},
			{
				id: uuidv4(),
				text: 'Task 2',
				belongsTo: 'Backlog',
			},
		],
	},
	{
		id: uuidv4(),
		title: 'In Progress',
		tasks: [
			{
				id: uuidv4(),
				text: 'Task 3',
				belongsTo: 'In Progress',
			},
			{
				id: uuidv4(),
				text: 'Task 4',
				belongsTo: 'In Progress',
			},
		],
	},
];
