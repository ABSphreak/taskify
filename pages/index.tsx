import { useState, createContext, useRef } from 'react';
import { PlusIcon } from '@heroicons/react/solid';
import { v4 as uuidv4 } from 'uuid';
import TasksGroup from '../components/TasksGroup';
import TasksGroupModal from '../components/TaskGroupModal';
import { mockGroups } from '../data/mock';
import { Task, TaskGroup } from '../data/types';

interface ITaskGroupContext {
	groups?: TaskGroup[];
	addGroup?: (title: string) => void;
	removeGroup?: (groupId: string) => void;
	updateGroup?: (id: string, title: string) => void;
	addTask?: (groupId: string, text: string) => void;
	updateTask?: (id: string, text: string, belongsTo: string) => void;
	removeTask?: (id: string, belongsTo: string) => void;
	moveTask?: (belongsTo: string, newGroupId: string, task: Task) => void;
}

export const TaskGroupContext = createContext<ITaskGroupContext>({});

export default function Home() {
	const [groups, setGroups] = useState([...mockGroups]);
	const [newGroupOpen, setNewGroupOpen] = useState(false);
	const belongsToRef = useRef<string>('');

	const addGroup = (title: string) => {
		setGroups([...groups, { id: uuidv4(), title, tasks: [] }]);
		setNewGroupOpen(false);
	};

	const removeGroup = (groupId: string) => {
		setGroups(groups.filter(group => group.id !== groupId));
	};

	const updateGroup = (groupId: string, title: string) => {
		setGroups(groups.map(group => (group.id === groupId ? { ...group, title } : group)));
	};

	const addTask = (groupId: string, text: string) => {
		setGroups(groups.map(group => (group.id === groupId ? { ...group, tasks: [...group.tasks, { id: uuidv4(), text, belongsTo: group.title }] } : group)));
	};

	const removeTask = (id: string, belongsTo: string) => {
		setGroups(groups.map(group => (group.title === belongsTo ? { ...group, tasks: group.tasks.filter(task => task.id !== id) } : group)));
	};

	const updateTask = (id: string, text: string, belongsTo: string) => {
		setGroups(
			groups.map(group => (group.title === belongsTo ? { ...group, tasks: group.tasks.map(task => (task.id === id ? { ...task, text } : task)) } : group))
		);
	};

	const moveTask = (belongsTo: string, newGroupId: string, task: Task) => {
		belongsToRef.current = belongsTo;

		const removedTaskGroups = groups.map(group => (group.title === belongsTo ? { ...group, tasks: group.tasks.filter(t => t.id !== task.id) } : group));

		const updatedTask = { ...task, belongsTo: groups.filter(group => group.id === newGroupId)?.[0].title };

		const newTaskGroups = removedTaskGroups.map(group => (group.id === newGroupId ? { ...group, tasks: [...group.tasks, updatedTask] } : group));

		setGroups([...newTaskGroups]);
	};

	return (
		<div className="flex flex-col items-center justify-center w-auto min-h-screen py-2 text-white bg-gray-900">
			<main className="flex flex-col items-center justify-center flex-1 w-screen px-10 text-center">
				<h2 className="self-start text-4xl">Taskify</h2>
				<div className="flex w-full mt-10 overflow-x-scroll gap-x-4">
					<TaskGroupContext.Provider value={{ groups, addGroup, removeGroup, updateGroup, addTask, updateTask, removeTask, moveTask }}>
						{groups.map(group => (
							<TasksGroup key={group.id} taskGroup={group} />
						))}
						<div className="mt-12 mb-2 border border-gray-700 border-dashed rounded-md min-w-60">
							<button
								type="button"
								className="flex items-center justify-center w-60 h-full gap-0.5 px-3 py-2 text-gray-500"
								onClick={() => setNewGroupOpen(true)}>
								Add Group <PlusIcon className="w-4 h-4" />
							</button>
							<TasksGroupModal setIsOpen={setNewGroupOpen} isOpen={newGroupOpen} />
						</div>
					</TaskGroupContext.Provider>
				</div>
			</main>
		</div>
	);
}
