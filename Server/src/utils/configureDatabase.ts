export const configureDatabase = () => {
	if (process.env.LAUNCH_MODE === 'DEVELOP') {
		process.env.DATABASE_URL = process.env.DEVELOP_DATABASE_URL;
	} else {
		process.env.DATABASE_URL = process.env.BUILD_DATABASE_URL;
	}
}