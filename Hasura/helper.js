export const updateStatsFromClient = async (data) => {
	// console.log('Update From Client working ...', data);
	const returnData = await fetch('/api/stats', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});

	console.log('Updated Data', returnData);
	return await returnData;
};
