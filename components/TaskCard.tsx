const TaskCard = ({ text }: { text: string }) => {
	return (
		<div className="px-3 py-3 my-2 text-left transition-shadow duration-100 border border-gray-700 rounded-sm shadow-sm select-none hover:cursor-grab active:cursor-grabbing w-60 shadow-gray-600 active:shadow-gray-200">
			{text}
		</div>
	);
};

export default TaskCard;
