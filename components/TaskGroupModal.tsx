import { useContext } from 'react';
import { Dialog } from '@headlessui/react';
import { Dispatch, SetStateAction } from 'react';
import { TaskGroupContext } from '../pages';

const TaskGroupModal = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: Dispatch<SetStateAction<boolean>> }) => {
	const ctx = useContext<any>(TaskGroupContext);
	const { addGroup } = ctx;

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const title = e.currentTarget.elements.namedItem('title') as HTMLInputElement;
		addGroup(title.value);
		setIsOpen(false);
	};

	return (
		<Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed inset-0 z-10 overflow-y-auto filter backdrop-blur-sm">
			<Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

			<div className="absolute p-4 -translate-x-1/2 -translate-y-1/2 bg-gray-700 rounded-md top-1/2 left-1/2">
				<Dialog.Title className="text-white">Edit Group</Dialog.Title>
				<Dialog.Description className="sr-only">Edit Group</Dialog.Description>

				<form className="flex flex-col items-start gap-2 mt-5" onSubmit={handleSubmit}>
					<input name="title" type="text" className="text-lg text-white bg-transparent border-b border-gray-500 focus:outline-none focus:border-blue-500" />
					<button
						type="submit"
						// onClick={() => setIsOpen(false)}
						className="px-3 py-1 mt-2 text-sm font-semibold text-white uppercase rounded-md bg-gradient-to-r from-blue-400 to-blue-600">
						Save
					</button>
				</form>
			</div>
		</Dialog>
	);
};

export default TaskGroupModal;
