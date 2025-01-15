## Silver K Gallery
# packages
- @emailjs/browser
- react
- react-router-dom
- framer-motion

# Note
- For the BrowserRouter basename, change it depending on which site it is being hosted at
- Image src's need to start with process.env.PUBLIC_URL
- ```npm run deploy``` for uploading to gh-pages
- Ensure to add loading="lazy" for things that are not in the initial viewport, and loading="eager" for things that are as well as fetchPriority="high", and then have decoding="async" for things outside the viewport as well

## WARNING, to host on github, this is running on base /silverkgallery - change in home page and check other pages and main router to change it back to base '/'
Hours: 560;

