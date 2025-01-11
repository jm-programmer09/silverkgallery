## This is documentation for how to use the products.json ##
# QUICK NOTES
- The keys for the end product format the path of the image in /public/img
eg: "animation" : {"marvel" : { __product__ }} this hence means that the path for the image will be /public/img/animation(__category__key__)/marvel(__theme__key__)/__product.image__(the final image source)
- The __product.title__ needs "stylesheet" : { text-transform: capitalize; }
- for creating a subcategory underneath the themes, use "subcategories" 

# dimensions
If no dimensions start with:
- [0, ...edition_sizes]
If only one base dimension:
- [[x, y]]
If two or more base dimensions:
- [ [ [x, y], [x, y], ...[x, y] ] ]

After first space of the array (array.atIndex(0)):
[0, __edition_size__, __paper_edition_size__, __glicee_edition_size__, __canvas_edition_size__]

# tags
- these are to help aid users search process, the first two will be displayed (make the first two the most important)
- If you dont want any tags to be displayed, have the first two as ""

# special
- this tag is for noting if it is limited edition or original
- [__limited_edition__, __original__, __signed__]

# note
- Say who it is signed by here
- include things like how many artist proofs it has "aka: Artist Proofs: 20", then the note would be "20 artist proofs"
- this is for special noting as a paragraph on the side

# author
- no capitals required, done by the display mechanism, do not include authors for animation products

# date 
- Format: "__month__/__year__" (e.g 8/1980)

