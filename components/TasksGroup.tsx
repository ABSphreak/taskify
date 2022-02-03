import { useContext, useState } from 'react';
import TaskCard from './TaskCard';
import TaskAddModal from './TaskAddModal';
import { PlusIcon } from '@heroicons/react/solid';
import { maxContent } from '../utils';
import { Task, TaskGroup } from '../data/types';
import { TaskGroupContext } from '../pages';

const TasksGroup = ({ taskGroup }: { taskGroup: TaskGroup }) => {
	const [taskAddOpen, setTaskAddOpen] = useState(false);
	const { moveTask } = useContext(TaskGroupContext);

	const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
	};

	const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
		let task = JSON.parse(e.dataTransfer.getData('task'));
		moveTask?.(task.belongsTo, taskGroup.id, task);
	};

	return (
		<>
			<div className="" onDragOver={onDragOver} onDrop={onDrop}>
				<div className="mb-5">
					<div className="text-xl font-bold text-left w-60">{maxContent(`${taskGroup.title}`, 20)}</div>
				</div>
				<div>
					{taskGroup.tasks.map((task: Task) => (
						<TaskCard key={task.id} task={task} />
					))}
					<div className="my-2 text-center transition-shadow duration-100 border border-gray-700 border-dashed rounded-sm shadow-sm select-none w-60">
						<button
							type="button"
							onClick={() => setTaskAddOpen(true)}
							className="flex items-center justify-center w-full h-full gap-0.5 px-3 py-2 text-gray-500">
							Add Task <PlusIcon className="w-4 h-4" />
						</button>
					</div>
				</div>
			</div>
			<TaskAddModal setIsOpen={setTaskAddOpen} isOpen={taskAddOpen} groupId={taskGroup.id} />
		</>
	);
};

export default TasksGroup;
