using AutoMapper;
using Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Activities
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Activity, ActivityDto>()
                .ForMember(dest =>
                    dest.Attendees,
                    o => o.MapFrom(s => s.UserActivities));
            CreateMap<UserActivity, AttendeeDto>()
                .ForMember(dest => 
                    dest.Username,
                    o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(dest =>
                    dest.DisplayName,
                    o => o.MapFrom(s => s.AppUser.DisplayName));
        }
    }
}
