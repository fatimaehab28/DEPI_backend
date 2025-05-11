namespace depiBackend.Exceptions
{
    public class ErrorResponse
    {
        public string Message { get; set; }
        public string ExceptionType { get; set; }
        public string StackTrace { get; set; }
        public object AdditionalData { get; set; }
    }
}