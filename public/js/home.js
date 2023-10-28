const blogSection = document.querySelector(".blogs-section");

db.collection("blogs").get().then((blogs)=>{
    blogs.forEach(blog => {
        if(blog.id != decodeURI(location.pathname.split("/").pop())){
            createBlog(blog)
        }
    })
})

const createBlog = (blog) => {
    let data = blog.data();
    let content = data.tags
    for(var i = 0; i < content.length; i++){
        content[i] = `<a class="blog-tag"><box-icon class="tag icon" name='purchase-tag' size="xs"></box-icon>${content[i]}</a>`
        // href="/tags/${content[i]}" add this also to the anchor tag
    }

    blogSection.innerHTML += ` 
        <div class="blog-card">
            <a class="blog-link" href="/${blog.id}">
                <img src="${data.bannerImage}" class="blog-image" alt="">
                <h1 class="blog-title">${data.title}</h1>
                <div class="blog-tags"> ${content.join(" ")} </div>
                <p class="blog-date"><box-icon class="calendar icon" name='calendar' color='grey' size="sm"></box-icon>${data.publishedAt}</p>
                <p class="blog-overview">${data.subtitle}</p>
                <a href="/${blog.id}" class="btn dark">read</a>
            </a>        
        </div>`;
}


