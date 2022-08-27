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

export async function fetchUserHasura(token) {
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

export async function fetchVideoStats(token, postData) {
	const { issuer, videoId } = postData;
	// console.log({ postData });
	const operationsDoc = `
	query MyQuery( $issuer:String! , $videoId : String!) {
	  stats(where: {userId: {_eq: $issuer}, videoId: {_eq: $videoId}}) {
		watched
		videoId
		userId
		id
		favourited
	  }
	}
  `;

	const { errors, data } = await fetchGraphQL(
		operationsDoc,
		'MyQuery',
		{
			issuer,
			videoId,
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

//Create Stats

export async function createStats(token, myData) {
	const { favourited, userId, videoId, watched } = myData;
	const operationsDoc = `
	  mutation MyMutation($favourited:Int! , $userId : String!, $videoId : String!,$watched: String!) {
	    insert_stats(objects: {favourited:$favourited, userId: $userId, videoId: $videoId, watched:$watched}) {
	      affected_rows
	    }
	  }
	`;

	const { errors, data } = await fetchGraphQL(
		operationsDoc,
		'MyMutation',
		{
			favourited,
			userId,
			videoId,
			watched,
		},
		token
	);

	if (errors) {
		// handle those errors like a pro
		console.error(errors);
	}


	return data;
}



//Update Stats

export async function updateStats(token, updateData) {

	const { issuer, videoId, favourited } = updateData;
	const operationsDoc = `
	  mutation MyMutation($issuer : String!, $videoId: String! , $favourited : Int!) {
	    update_stats(where: {userId: {_eq: $issuer}, videoId: {_eq: $videoId}}, _set: {favourited: $favourited}) {
	      returning {
	        favourited
	        userId
	        videoId
	        watched
	      }
	    }
	  }
	`;

	const { errors, data } = await fetchGraphQL(
		operationsDoc,
		'MyMutation',
		{
			issuer,
			videoId,
			favourited,
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

///Fetch Favourited

export async function fetchFavourited(token, info) {
	const { issuer, videoId } = info;
	const operationsDoc = `
  query MyQuery($issuer : String!, $videoId : String!) {
    stats(where: {userId: {_eq: $issuer}, videoId: {_eq: $videoId}}) {
      favourited
    }
  }
`;
	const { errors, data } = await fetchGraphQL(
		operationsDoc,
		'MyQuery',
		{
			issuer,
			videoId,
		},
		token
	);

	if (errors) {
		// handle those errors like a pro
		console.error(errors);
	}

	// do something great with this precious data
	return data?.stats[0]?.favourited;
}

//Fetch Watch Again

export async function fetchWatchAgain(token, issuer) {
	const operationsDoc = `
  query MyQuery ($issuer : String!) {
    stats(where: {favourited: {_neq: 2}, userId: {_eq: $issuer}}) {
      videoId
      favourited
	  watched
    }
  }
`;
	const { errors, data } = await fetchGraphQL(
		operationsDoc,
		'MyQuery',
		{
			issuer,
		},
		token
	);

	if (errors) {
		// handle those errors like a pro
		console.error(errors);
	}

	// do something great with this precious data
	return data?.stats;
}

export async function fetchMyList(token, issuer) {
	const operationsDoc = `
  query MyQuery ($issuer:String!) {
    stats(where: {favourited: {_eq: 1}, userId: {_eq: $issuer}}) {
      videoId
      favourited
	  watched
    }
  }
`;
	const { errors, data } = await fetchGraphQL(
		operationsDoc,
		'MyQuery',
		{
			issuer,
		},
		token
	);

	if (errors) {
		// handle those errors like a pro
		console.error(errors);
	}

	// do something great with this precious data
	return data?.stats;
}
