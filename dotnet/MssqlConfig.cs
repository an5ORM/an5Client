// This file is auto-generated. Do not edit directly.
using System;

namespace MssqlOrm
{
    public static class MssqlConfig
    {
        public static string ConnectionString { get; set; } = Environment.GetEnvironmentVariable("DATABASE_URL") ?? "Server=localhost;Database=master;Trusted_Connection=True;TrustServerCertificate=True;";
    }
}
