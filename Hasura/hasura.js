/*
This is an example snippet - you should consider tailoring it
to your service.
*/

async function fetchGraphQL(operationsDoc, operationName, variables) {
	const result = await fetch('https://clone.hasura.app/v1/graphql', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			// 'Content-Type': 'application/x-www-form-urlencoded',
			// 'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HASURA_KEY,
			Authorization:
				'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiaGV5IiwiaWF0IjoxNjYwOTcxMzI1LCJleHAiOjE2NjE4MzI1NzUsImh0dHBzOi8vaGFzdXJhLmlvL2p3dC9jbGFpbXMiOnsieC1oYXN1cmEtYWxsb3dlZC1yb2xlcyI6WyJhZG1pbiIsInVzZXIiXSwieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoidXNlciIsIngtaGFzdXJhLXVzZXItaWQiOiJ6cGgifX0.YNhBMBFcXwnrk_x6_L7vn03AnngPC7FB-yqkDnPXIWA',
		},
		body: JSON.stringify({
			query: operationsDoc,
			variables: variables,
			operationName: operationName,
		}),
	});

	return await result.json();
}

const operationsDoc = `
    query MyQuery {
      users {
        issuer
        publicAdress
        id
        email
      }
    }
    
  `;

function fetchMyQuery() {
	return fetchGraphQL(operationsDoc, 'MyQuery', {});
}

// function executeMyMutation() {
// 	return fetchGraphQL(operationsDoc, 'MyMutation', {});
// }

export async function startFetchMyQuery() {
	const { errors, data } = await fetchMyQuery();

	if (errors) {
		// handle those errors like a pro
		console.error(errors);
	}

	// do something great with this precious data
	console.log(data);
}

// startFetchMyQuery();

// async function startExecuteMyMutation() {
// 	const { errors, data } = await executeMyMutation();

// 	if (errors) {
// 		// handle those errors like a pro
// 		console.error(errors);
// 	}

// 	// do something great with this precious data
// 	console.log(data);
// }

// startExecuteMyMutation();
