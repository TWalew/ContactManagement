using System;
using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models
{
    public class Contact
    {
        [Key]
        public int ContactId { get; set; }

        public string FirstName { get; set; }

        public string Surname { get; set; }

        public DateTime DateOfBirth { get; set; }

        public string Address { get; set; }

        public string PhoneNumber { get; set; }

        public string IBAN { get; set; }

    }
}
