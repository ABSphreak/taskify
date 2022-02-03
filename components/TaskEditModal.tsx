import { Dispatch, SetStateAction, useContext } from 'react';
import { Dialog } from '@headlessui/react';
import { TaskGroupContext } from '../pages';

const TaskEditModal = ({
	isOpen,
	setIsOpen,
	task,
}: {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	task: { id: string; text: string; belongsTo: string };
}) => {
	const { updateTask } = useContext(TaskGroupContext);

	const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const title = e.currentTarget.elements.namedItem('title') as HTMLInputElement;
		updateTask?.(task.id, title.value, task.belongsTo);
		setIsOpen(false);
	};

	return (
		<Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed inset-0 z-10 overflow-y-auto filter backdrop-blur-sm">
			<Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

			<div className="absolute p-4 -translate-x-1/2 -translate-y-1/2 bg-gray-700 rounded-md top-1/2 left-1/2">
				<Dialog.Title className="text-white">Edit Task</Dialog.Title>
				<Dialog.Description className="sr-only">Edit your modal</Dialog.Description>

				<form className="flex flex-col items-start gap-2 mt-5" onSubmit={handleUpdate}>
					<input type="text" name="title" className="text-lg text-white bg-transparent border-b border-gray-500 focus:outline-none focus:border-blue-500" />
					<button type="submit" className="px-3 py-1 mt-2 text-sm font-semibold text-white uppercase rounded-md bg-gradient-to-r from-blue-400 to-blue-600">
						Save
					</button>
				</form>
			</div>
		</Dialog>
	);
};

export default TaskEditModal;
