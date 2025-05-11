using System;
using System.Net;

namespace depiBackend.Exceptions
{
    public class CustomApiException : Exception
    {
        public HttpStatusCode StatusCode { get; }
        public object ErrorData { get; }

        public CustomApiException(string message, HttpStatusCode statusCode = HttpStatusCode.BadRequest, object errorData = null)
            : base(message)
        {
            StatusCode = statusCode;
            ErrorData = errorData;
        }
    }
}