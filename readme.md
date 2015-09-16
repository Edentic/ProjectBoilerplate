#Edentic BaseProject vagrant box based on Laravel Homestead

Documentation on the Laravel Homested box [is located here](http://laravel.com/docs/homestead?version=4.2).


##Errors and howto resolve
###Error: `libsass` bindings not found 
If you get the following error when running gulp on your local machine, please run the command `npm rebuild node-sass` in your console to fix the issue

```
Error: `libsass` bindings not found in /Users/Baagoe/Repos/Edentic/BaseProject/node_modules/gulp-sass/node_modules/node-sass/vendor/darwin-x64-14/binding.node. Try reinstalling `node-sass`?
    at Object.sass.getBinaryPath (/Users/Baagoe/Repos/Edentic/BaseProject/node_modules/gulp-sass/node_modules/node-sass/lib/extensions.js:150:11)
    at Object.<anonymous> (/Users/Baagoe/Repos/Edentic/BaseProject/node_modules/gulp-sass/node_modules/node-sass/lib/index.js:16:36)
    at Module._compile (module.js:460:26)
    at Object.Module._extensions..js (module.js:478:10)
    at Module.load (module.js:355:32)
    at Function.Module._load (module.js:310:12)
    at Module.require (module.js:365:17)
    at require (module.js:384:17)
    at Object.<anonymous> (/Users/Baagoe/Repos/Edentic/BaseProject/node_modules/gulp-sass/index.js:163:21)
    at Module._compile (module.js:460:26)

```