using Microsoft.EntityFrameworkCore;

namespace WebAPI.Models
{
    public class ContactsDBContext : DbContext
    {

        public ContactsDBContext(DbContextOptions<ContactsDBContext> options)
            : base(options)
        {

        }

        public DbSet<Contact> Contacts { get; set; }
    }
}
