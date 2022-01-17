import TaskCard from './TaskCard';
import { PlusIcon } from '@heroicons/react/solid';
import { maxContent } from '../utils';

type TaskGroupType = {
	id: number;
	title: string;
	tasks: {
		id: number;
		text: string;
		belongsTo: string;
	}[];
};

const TasksGroup = ({ taskGroup }: { taskGroup: TaskGroupType }) => {
	return (
		<div className="">
			<div className="mb-5">
				<div className="text-xl font-bold text-left w-60">{maxContent(`${taskGroup.title}`, 20)}</div>
			</div>
			<div>
				{taskGroup.tasks.map(task => (
					<TaskCard key={task.id} text={task.text} />
				))}
				<div className="my-2 text-center transition-shadow duration-100 border border-gray-700 border-dashed rounded-sm shadow-sm select-none w-60">
					<button className="flex items-center justify-center w-full h-full gap-0.5 px-3 py-2 text-gray-500">
						Add Task <PlusIcon className="w-4 h-4" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default TasksGroup;
