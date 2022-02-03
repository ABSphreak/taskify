import { useState } from 'react';
import TaskEditModal from './TaskEditModal';
import { DotsHorizontalIcon } from '@heroicons/react/solid';
import { Task } from '../data/types';

const TaskCard = ({ task }: { task: Task }) => {
	const [isOpen, setIsOpen] = useState(false);

	const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
		e.dataTransfer.setData('task', JSON.stringify(task));
		e.currentTarget.classList.add('opacity-50');
	};

	return (
		<>
			<div
				draggable
				onDragStart={onDragStart}
				className="relative px-3 py-3 my-2 text-left transition-shadow duration-100 border border-gray-700 rounded-sm shadow-sm select-none hover:cursor-grab active:cursor-grabbing w-60 shadow-gray-600 active:shadow-gray-200">
				<div>{task.text}</div>
				<div className="absolute top-0 right-[3px]">
					<button className="px-2 py-1 text-gray-500 rounded-sm shadow-sm" onClick={() => setIsOpen(true)}>
						<DotsHorizontalIcon className="w-5 h-5" />
					</button>
				</div>
			</div>
			<TaskEditModal isOpen={isOpen} setIsOpen={setIsOpen} task={task} />
		</>
	);
};

export default TaskCard;
