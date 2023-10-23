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
        content[i] = `<a href="/tags/${content[i]}" class="blog-tag">#${content[i]}</a>`
    }

    blogSection.innerHTML += ` 
        <div class="blog-card">
            <img src="${data.bannerImage}" class="blog-image" alt="">
            <div class="blog-tags"> ${content.join(" ")} </div>
            <h1 class="blog-title">${data.title}</h1>
            <p class="blog-date">${data.publishedAt}</p>
            <p class="blog-overview">${data.subtitle}</p>
            <a href="/${blog.id}" class="btn dark">read</a>
        </div>`;
}