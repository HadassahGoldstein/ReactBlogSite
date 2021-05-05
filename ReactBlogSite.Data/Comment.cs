using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace ReactBlogSite.Data
{
    public class Comment
    {
        public int Id { get; set; }
        public int BlogPostId { get; set; }
        public DateTime Date { get; set; }
        public string Name { get; set; }
        public string Text { get; set; }
        [JsonIgnore]
        public BlogPost BlogPost { get; set; }
    }
}
