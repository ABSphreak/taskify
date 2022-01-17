import { useState, useEffect } from 'react';
import { PlusIcon } from '@heroicons/react/solid';
import TasksGroup from '../components/TasksGroup';
import { mockTasks, mockGroups } from '../data/mock';

export default function Home() {
	const [tasks, setTasks] = useState([...mockTasks]);
	const [groups, setGroups] = useState([...mockGroups]);

	return (
		<div className="flex flex-col items-center justify-center w-auto min-h-screen py-2 text-white bg-gray-900">
			<main className="flex flex-col items-center justify-center flex-1 w-screen px-10 text-center">
				<h2 className="text-4xl">Taskify</h2>
				<div className="flex w-full mt-10 overflow-x-scroll gap-x-4">
					{groups.map(group => (
						<TasksGroup key={group.id} taskGroup={group} />
					))}
					<div className="mt-12 mb-2 border border-gray-700 border-dashed rounded-md min-w-60">
						<button className="flex items-center justify-center w-60 h-full gap-0.5 px-3 py-2 text-gray-500">
							Add Group <PlusIcon className="w-4 h-4" />
						</button>
					</div>
				</div>
			</main>
		</div>
	);
}
