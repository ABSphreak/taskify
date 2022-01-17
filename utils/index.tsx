export const maxContent = (content: string, maxLength: number): string => {
	const contentLength = content.length;
	if (contentLength <= maxLength) {
		return content;
	}
	return content.substring(0, maxLength) + '...';
};
