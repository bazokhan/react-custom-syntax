import { useState, useMemo } from "react";
import {
  CustomSyntaxEditor,
  ConfigManager,
  odataConfig,
} from "react-custom-syntax";

/**
 * Comprehensive OData Editor Example
 *
 * Demonstrates:
 * - All OData operators and functions with color coding
 * - String literals (orange)
 * - Number literals (green)
 * - Date/time literals (teal)
 * - Logical operators (blue)
 * - Comparison operators (blue)
 * - Arithmetic operators (blue)
 * - String functions (yellow)
 * - Date functions (yellow)
 * - Custom tokens (purple)
 */
export function ComprehensiveODataEditor() {
  const initialValue = `/* OData Query Reference Example */
/* Shows all configured syntax types with color highlighting */

/* Logical Operators (Blue, Bold) */
status eq 'Active' and priority gt 5
true or false
not null

/* Comparison Operators (Blue, Bold) */
age eq 21
price ne 100
quantity gt 0
score ge 80
stock lt 10
temp le 32

/* Arithmetic Operators (Blue, Bold) */
price add discount sub 10
total mul 1.2
revenue div 12
result mod 7

/* Collection Operators (Blue, Bold) */
items/any(d: d/status eq 'shipped')
tasks/all(t: t/completed eq true)

/* Other Operators (Blue, Bold) */
tags in ['urgent', 'important']
email has '@example.com'

/* String Functions (Yellow) */
contains(name, 'John')
endswith(email, '@company.com')
startswith(title, 'Product')
length(description)
indexof(message, 'error')
substring(name, 0, 5)
tolower(title)
toupper(status)
trim(spaces)
concat(first, last)

/* Date Functions (Yellow) */
year(birthDate) eq 1990
month(createdAt) eq 12
day(eventDate) eq 25
hour(startTime) gt 18
minute(endTime) lt 30
second(timestamp) eq 0
date(timestamp)
time(eventTime)
now()

/* Boolean Literals (Blue) */
isActive eq true
isDeleted eq false
value ne null

/* Custom Tokens (Purple) */
createdDate ge @today
eventTime ge @yesterday
period eq @this_week
monthly eq @this_month
userId eq CurrentUserId

/* Complex Example */
(
  (status eq 'Active' or status eq 'Pending')
  and (priority gt 3 or assignedUser eq CurrentUserId)
  and createdDate ge @this_week
)
and (
  contains(title, 'Bug') or contains(title, 'Issue')
)
and length(description) gt 50`;

  const [value, setValue] = useState(initialValue);

  const configManager = useMemo(() => new ConfigManager(odataConfig), []);

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <div
      style={{
        padding: "2rem",
        background: "#1e1e1e",
        borderRadius: "8px",
      }}
    >
      <div style={{ marginBottom: "2rem" }}>
        <CustomSyntaxEditor
          value={value}
          onChange={handleChange}
          configManager={configManager}
          headerLabel="OData Reference - All Syntax Types"
          placeholder="Explore the pre-loaded examples showing all OData features..."
          headerLinks={[
            {
              href: "https://learn.microsoft.com/en-us/odata/client/query-options",
              label: "OData Documentation",
              title: "Learn more about OData query syntax",
            },
            {
              href: "https://azuresearch.github.io/odata-syntax-diagram",
              label: "Syntax Diagram",
              title: "Visual OData syntax reference",
            },
          ]}
        />
      </div>

      <div
        style={{
          marginTop: "1rem",
          padding: "1rem",
          background: "#252526",
          borderRadius: "4px",
          borderLeft: "3px solid #4ec9b0",
        }}
      >
        <h3
          style={{
            margin: "0 0 0.5rem 0",
            color: "#4ec9b0",
            fontSize: "0.9rem",
          }}
        >
          Color Legend:
        </h3>
        <ul
          style={{
            color: "#858585",
            paddingLeft: "1.5rem",
            margin: 0,
            fontSize: "0.85rem",
          }}
        >
          <li>
            <code style={{ color: "#569cd6", fontWeight: 600 }}>
              Operators
            </code>{" "}
            - Logical, Comparison, Arithmetic (Blue)
          </li>
          <li>
            <code style={{ color: "#dcdcaa", fontWeight: 500 }}>
              Functions
            </code>{" "}
            - String, Date functions (Yellow)
          </li>
          <li>
            <code style={{ color: "#ce9178" }}>String Literals</code> -
            Single-quoted strings (Orange)
          </li>
          <li>
            <code style={{ color: "#b5cea8" }}>Numbers</code> - Numeric
            values (Green)
          </li>
          <li>
            <code style={{ color: "#4ec9b0" }}>Date Literals</code> - ISO
            dates (Teal)
          </li>
          <li>
            <code style={{ color: "#c586c0", fontWeight: 600 }}>
              Custom Tokens
            </code>{" "}
            - System variables (Purple)
          </li>
        </ul>
      </div>

      <div style={{ marginTop: "1rem", fontSize: "0.85rem" }}>
        <h3 style={{ margin: "0 0 0.5rem 0", color: "#4ec9b0" }}>
          Try These:
        </h3>
        <ul style={{ color: "#858585", paddingLeft: "1.5rem", margin: 0 }}>
          <li>Edit the query above to see real-time highlighting</li>
          <li>Add your own logical operators (and, or, not)</li>
          <li>Use comparison operators (eq, ne, gt, ge, lt, le)</li>
          <li>Try string functions like contains(), length(), toupper()</li>
          <li>Use date functions like year(), month(), now()</li>
          <li>Experiment with custom tokens like @today, CurrentUserId</li>
        </ul>
      </div>

      <div style={{ marginTop: "1.5rem" }}>
        <h3 style={{ margin: "0 0 0.5rem 0", color: "#4ec9b0", fontSize: "0.9rem" }}>
          Raw Value (for form submission):
        </h3>
        <textarea
          readOnly
          value={value}
          style={{
            width: "100%",
            minHeight: "120px",
            padding: "0.75rem",
            background: "#252526",
            color: "#d4d4d4",
            border: "1px solid #404040",
            borderRadius: "4px",
            fontFamily: "Consolas, 'Monaco', 'Courier New', monospace",
            fontSize: "0.85rem",
            resize: "vertical",
            cursor: "text",
          }}
          onFocus={(e) => {
            e.target.select();
          }}
        />
        <p style={{ margin: "0.5rem 0 0 0", fontSize: "0.75rem", color: "#858585" }}>
          This is the plain text value you would use in forms or API calls.
        </p>
      </div>
    </div>
  );
}

