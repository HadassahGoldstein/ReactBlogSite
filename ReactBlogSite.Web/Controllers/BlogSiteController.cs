using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ReactBlogSite.Data;
using ReactBlogSite.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactBlogSite.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogSiteController : ControllerBase
    {
        private string _connectionString;
        public BlogSiteController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpGet]
        [Route("GetAll")]
        public List<BlogPost> GetAll(int page)
        {
            var repo = new BlogPostRepository(_connectionString);
            return repo.GetBlogPostsPerPage(page);
        }
        [HttpGet]
        [Route("ViewPost")]
        public BlogPost ViewPost(int id)
        {
            var repo = new BlogPostRepository(_connectionString);
            if (id == 0)
            {
                return repo.GetRecentBlog();
            }
            return repo.GetBlogPost(id);
        }
        [HttpPost]
        [Route("AddPost")]
        public void AddPost(BlogPost bp)
        {
            var repo = new BlogPostRepository(_connectionString);
            repo.AddBlogPost(bp);
        }
        [HttpPost]
        [Route("AddComment")]
        public void AddComment(Comment c)
        {
            var repo = new BlogPostRepository(_connectionString);
            if (c.BlogPostId == 0)
            {
                c.BlogPostId = repo.GetRecentBlog().Id;
            }
            repo.AddComment(c);
        }
        [HttpGet]
        [Route("NumOfPosts")]
        public NumPostsModel NumOfPosts()
        {
            var repo = new BlogPostRepository(_connectionString);
            return new NumPostsModel()
            {
                NumPosts = repo.NumPosts()
            };
            
        }        
    }
}
