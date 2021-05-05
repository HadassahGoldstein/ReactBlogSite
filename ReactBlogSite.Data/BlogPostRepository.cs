using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ReactBlogSite.Data
{
    public class BlogPostRepository
    {
        private readonly string _connectionString;
        public BlogPostRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        public BlogPost GetBlogPost(int id)
        {
            using var context = new BlogPostsDbContext(_connectionString);
            return context.BlogPosts.Include(b=>b.Comments).FirstOrDefault(b => b.Id == id);
        }
        public void AddBlogPost(BlogPost bp)
        {
            using var context = new BlogPostsDbContext(_connectionString);
            bp.Date = DateTime.Now;
            context.BlogPosts.Add(bp);
            context.SaveChanges();
        }
        public void AddComment(Comment c)
        {
            using var context = new BlogPostsDbContext(_connectionString);
            c.Date = DateTime.Now;
            context.Comments.Add(c);
            context.SaveChanges();
        }
        
        public List<BlogPost> GetBlogPostsPerPage(int page)
        {

            using var context = new BlogPostsDbContext(_connectionString);
            return context.BlogPosts
                .Include(b => b.Comments)
                .OrderByDescending(b => b.Date)
                .Skip(page * 3).Take(3)
                .ToList();
        }
        public int NumPosts()
        {
            using var context = new BlogPostsDbContext(_connectionString);
            return context.BlogPosts.Count();
        }
        public BlogPost GetRecentBlog()
        {
            using var context = new BlogPostsDbContext(_connectionString);
            return context.BlogPosts.Include(b=>b.Comments).OrderByDescending(b => b.Date).First();
        }              
        
    }
}
