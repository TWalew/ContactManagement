using FluentValidation;
using WebAPI.Models;

namespace ContactManagement.Models
{
    public class ContactValidator: AbstractValidator<Contact>
    {
        public ContactValidator()
        {
            RuleFor(x => x.ContactId).NotNull();
            RuleFor(x => x.FirstName).NotNull().Length(0, 500);
            RuleFor(x => x.Surname).NotNull().Length(0, 500);
            RuleFor(x => x.DateOfBirth).NotNull();
            RuleFor(x => x.Address).NotNull().Length(0,500);
            RuleFor(x => x.PhoneNumber).NotNull().Length(0, 15); ;
            RuleFor(x => x.IBAN).NotNull().Length(0, 35); ;

        }
    }
}