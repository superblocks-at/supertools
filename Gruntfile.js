module.exports = function (grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		watch: {
			scripts: {
				files: ["packages/lib/dist/index.js"],
				tasks: ["touch"],
				options: {
					spawn: false,
				},
			},
		},
		touch: ["packages/url/frontend/index.js"],
	});

	// Load the plugin that provides the "watch" task.
	grunt.loadNpmTasks("grunt-contrib-watch");

	grunt.loadNpmTasks("grunt-touch");

	// Default task(s).
	grunt.registerTask("default", ["watch"]);
};
