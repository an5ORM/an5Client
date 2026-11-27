// This file is auto-generated. Do not edit directly.
using System;
using System.Collections.Generic;

namespace An5Orm.Entities
{
    public class User
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public DateTime CreatedAt { get; set; }

        // ── Relation counts (populated via Include._count) ───────────────────
        public Dictionary<string, int> _count { get; set; }
    }
}
