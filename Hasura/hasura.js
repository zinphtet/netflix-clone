/*
This is an example snippet - you should consider tailoring it
to your service.
*/

async function fetchGraphQL(operationsDoc, operationName, variables, token) {
	const result = await fetch('https://clone.hasura.app/v1/graphql', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			// 'Content-Type': 'application/x-www-form-urlencoded',
			// 'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HASURA_KEY,
			Authorization: `Bearer ${token}`,
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

export async function fetchUserHasura(token) {
	const { errors, data } = await fetchGraphQL(
		operationsDoc,
		'MyQuery',
		{},
		token
	);
	if (errors) {
		// handle those errors like a pro
		console.error(errors);
		return {
			message: 'Error occured',
		};
	}
	// do something great with this precious data
	return data;
}

export async function createNewUser(token, metadata) {
	const { email, publicAddress, issuer } = metadata;

	const operationsDocMutate = `
	mutation MyMutation ($email : String! , $issuer : String! , $publicAddress : String!){
	  insert_users(objects: {email: $email, issuer: $issuer, publicAdress:$publicAddress}) {
		returning {
		  email
		  issuer
		  publicAdress
		}
	  }
	}
  `;

	const { errors, data } = await fetchGraphQL(
		operationsDocMutate,
		'MyMutation',
		{
			email,
			issuer,
			publicAddress,
		},
		token
	);

	if (errors) {
		// handle those errors like a pro
		console.error(errors);
	}

	// do something great with this precious data
	return data;
}

// startExecuteMyMutation();
