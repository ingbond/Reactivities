using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Validators
{
    public static class ValidatorExtensions
    {
        public static IRuleBuilder<T, string> Password<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            var options = ruleBuilder.NotEmpty()
                    .MinimumLength(6).WithMessage("Password must be at leats 6 char")
                    .Matches("[^a-zA-Z0-9]").WithMessage("Password must contains non alphanumeric")
                    .Matches("[0-9]").WithMessage("Password must contains number")
                    .Matches("[A-Z]").WithMessage("Password must contains uppercase")
                    .Matches("[a-z]").WithMessage("Password must contains lowercase");
            return options;
        }
    }
}
