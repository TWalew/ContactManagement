using System;
using System.Collections.Generic;

namespace WebAPI.Models
{
    public interface IContactRepository
    {
        Contact GetContact(int id);
        IEnumerable<Contact> GetAllContacts();
        Contact Add(Contact contact);
        Contact Update(Contact contactChanges);
        Contact Delete(int id);
    }
}
