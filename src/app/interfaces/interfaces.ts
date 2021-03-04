export interface User {
    id?: number,
    name?: string,
	surname?: string,
	edad?: number,
	username?: string,
	password?: string,
	roles?: string[],
	customer?: Customer;
}

export interface Customer {
    username?: string,
	wishes?: Wish[],
	points?: number,
	user?: User
}

export interface Wish{
    title?: string,
	description?: string,
	value?: number,
	customers?: string[],
	completed?: boolean
}
