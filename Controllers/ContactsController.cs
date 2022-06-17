using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly IContactRepository _contactRepository;

        public ContactsController(IContactRepository contactRepository)
        {
            _contactRepository = contactRepository;
        }

        [HttpGet]
        public JsonResult Get()
        {
            return new JsonResult(_contactRepository.GetAllContacts());
        }
        [HttpPost]
        public JsonResult Post(Contact con)
        {
            return new JsonResult(_contactRepository.Add(con));
        }
        [HttpPut]
        public JsonResult Put(Contact con)
        {
            return new JsonResult(_contactRepository.Update(con));
        }
        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            return new JsonResult(_contactRepository.Delete(id));
        }
    }
}
