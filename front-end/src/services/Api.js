import axios from 'axios'

export default (baseURL) => {
	return axios.create({
		baseURL: baseURL,
		withCredentials: false,
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'PRIVATE-TOKEN' : 'x8dwcM6_CRzxd4jVY6s3'
		}
	})
}
