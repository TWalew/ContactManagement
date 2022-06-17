using System.Collections.Generic;

namespace WebAPI.Models
{
    public class SQLContactRepository : IContactRepository
    {
        private readonly ContactsDBContext context;
        public SQLContactRepository(ContactsDBContext context)
        {
            this.context = context;
        }
        public Contact Add(Contact contact)
        {
            context.Contacts.Add(contact);
            context.SaveChanges();
            return contact;
        }

        public Contact Delete(int id)
        {
            Contact contact = context.Contacts.Find(id);
            if (contact != null)
            {
                context.Contacts.Remove(contact);
                context.SaveChanges();
            }
            return contact;
        }

        public IEnumerable<Contact> GetAllContacts()
        {
            return context.Contacts;
        }

        public Contact GetContact(int id)
        {
            return context.Contacts.Find(id);

        }

        public Contact Update(Contact contactChanges)
        {
            var entity = context.Contacts.Find(contactChanges.ContactId);
            if (entity != null)
            {
                context.Entry(entity).CurrentValues.SetValues(contactChanges);
                context.SaveChanges();
            }

            return contactChanges;
        }
    }
}
