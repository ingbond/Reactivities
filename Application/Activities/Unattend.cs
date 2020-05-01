using Application.Errors;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Activities
{
    public class Unattend
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }


        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                this._context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = _context.Activities.Where(x => x.Id == request.Id).FirstOrDefault();

                if (activity == null)
                {
                    throw new RestException(System.Net.HttpStatusCode.NotFound, new { Activity = "Could not find activity" });
                }

                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());

                var attendance = await _context.UserActivities.SingleOrDefaultAsync(x => x.ActivityId == activity.Id && x.AppUserId == user.Id);

                if (attendance == null)
                    return Unit.Value;

                if (attendance.IsHost)
                    throw new RestException(System.Net.HttpStatusCode.BadRequest, new { Attendance = "You cannot remove yourself as host" });

                _context.UserActivities.Remove(attendance);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}
