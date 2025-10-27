export function Legal() {
  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ color: "#4ec9b0", fontSize: "2.5rem", marginTop: 0 }}>
        ⚖️ Legal & Notices
      </h1>

      {/* Disclaimer */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#4ec9b0", fontSize: "1.75rem", marginTop: 0 }}>
          Disclaimer
        </h2>
        <div
          style={{
            background: "#2d1f1f",
            borderLeft: "3px solid #f48771",
            padding: "1rem",
            borderRadius: "4px",
          }}
        >
          <p style={{ color: "#d4d4d4", fontSize: "1rem", lineHeight: "1.6", margin: 0 }}>
            <strong style={{ color: "#f48771" }}>Important:</strong> This library was developed with the assistance of AI tools. 
            While efforts have been made to ensure quality and functionality, it is provided &quot;as is&quot; without warranties of any kind.
          </p>
        </div>

        <div
          style={{
            background: "#1e2f1e",
            borderLeft: "3px solid #4ec9b0",
            padding: "1rem",
            borderRadius: "4px",
            marginTop: "1rem",
          }}
        >
          <p style={{ color: "#d4d4d4", fontSize: "1rem", lineHeight: "1.6", margin: 0 }}>
            <strong style={{ color: "#4ec9b0" }}>Use at Your Own Risk:</strong> The author does not bear responsibility for using this library 
            in production environments. Please thoroughly test and review the code before deploying to production.
          </p>
        </div>
      </section>

      {/* License */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#4ec9b0", fontSize: "1.75rem" }}>
          License
        </h2>
        <div
          style={{
            background: "#252526",
            padding: "1.5rem",
            borderRadius: "4px",
          }}
        >
          <h3 style={{ color: "#4ec9b0", fontSize: "1.25rem", marginTop: 0 }}>
            MIT License
          </h3>
          <p style={{ color: "#858585", fontSize: "0.9rem" }}>
            Copyright © {new Date().getFullYear()} Mohamed Elbaz
          </p>
          <p style={{ color: "#d4d4d4", fontSize: "0.95rem", lineHeight: "1.6" }}>
            Permission is hereby granted, free of charge, to any person obtaining a copy
            of this software and associated documentation files (the &quot;Software&quot;), to deal
            in the Software without restriction, including without limitation the rights
            to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
            copies of the Software, and to permit persons to whom the Software is
            furnished to do so, subject to the following conditions:
          </p>
          <p style={{ color: "#d4d4d4", fontSize: "0.95rem", lineHeight: "1.6" }}>
            The above copyright notice and this permission notice shall be included in all
            copies or substantial portions of the Software.
          </p>
          <p style={{ color: "#d4d4d4", fontSize: "0.95rem", lineHeight: "1.6" }}>
            THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
            IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
            FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
            AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
            LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
            OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
            SOFTWARE.
          </p>
        </div>
      </section>

      {/* Repository Links */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#4ec9b0", fontSize: "1.75rem" }}>
          Repository & Links
        </h2>
        <div
          style={{
            background: "#252526",
            padding: "1.5rem",
            borderRadius: "4px",
          }}
        >
          <h3 style={{ color: "#4ec9b0", fontSize: "1.25rem", marginTop: 0 }}>
            Project Links
          </h3>
          <ul style={{ color: "#858585", paddingLeft: "1.5rem" }}>
            <li>
              <a
                href="https://github.com/bazokhan/react-custom-syntax"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#4ec9b0", textDecoration: "none" }}
              >
                📦 GitHub Repository
              </a>
            </li>
            <li>
              <a
                href="https://www.npmjs.com/package/react-custom-syntax"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#4ec9b0", textDecoration: "none" }}
              >
                📦 npm Package
              </a>
            </li>
            <li>
              <a
                href="https://azuresearch.github.io/odata-syntax-diagram"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#4ec9b0", textDecoration: "none" }}
              >
                📘 OData Syntax Reference
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* About */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#4ec9b0", fontSize: "1.75rem" }}>
          About the Project
        </h2>
        <div
          style={{
            background: "#252526",
            padding: "1.5rem",
            borderRadius: "4px",
          }}
        >
          <h3 style={{ color: "#4ec9b0", fontSize: "1.25rem", marginTop: 0 }}>
            Author
          </h3>
          <p style={{ color: "#d4d4d4", fontSize: "1rem" }}>
            Mohamed Elbaz
          </p>

          <h3 style={{ color: "#4ec9b0", fontSize: "1.25rem", marginTop: "1.5rem" }}>
            Version
          </h3>
          <p style={{ color: "#d4d4d4", fontSize: "1rem" }}>
            1.0.0
          </p>

          <h3 style={{ color: "#4ec9b0", fontSize: "1.25rem", marginTop: "1.5rem" }}>
            Description
          </h3>
          <p style={{ color: "#858585", fontSize: "0.95rem", lineHeight: "1.6" }}>
            A lightweight, customizable React syntax editor with rule-based highlighting, 
            prettification, and plugin support. Define any custom language syntax using JSON configuration.
          </p>

          <h3 style={{ color: "#4ec9b0", fontSize: "1.25rem", marginTop: "1.5rem" }}>
            Development Notice
          </h3>
          <p style={{ color: "#858585", fontSize: "0.95rem", lineHeight: "1.6" }}>
            This project was developed with the assistance of AI tools. While the codebase has been 
            reviewed and tested, users are encouraged to thoroughly test in their own environments before 
            production deployment.
          </p>
        </div>
      </section>

      {/* Contributing */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#4ec9b0", fontSize: "1.75rem" }}>
          Contributing
        </h2>
        <div
          style={{
            background: "#252526",
            padding: "1.5rem",
            borderRadius: "4px",
          }}
        >
          <p style={{ color: "#d4d4d4", fontSize: "1rem", lineHeight: "1.6" }}>
            Contributions are welcome! Please feel free to submit issues, feature requests, or pull requests on GitHub.
          </p>
          <p style={{ color: "#858585", fontSize: "0.95rem", lineHeight: "1.6", marginTop: "1rem" }}>
            When contributing, please ensure that:
          </p>
          <ul style={{ color: "#858585", paddingLeft: "1.5rem" }}>
            <li>Code follows existing conventions</li>
            <li>Tests are added/updated for new features</li>
            <li>Documentation is updated as needed</li>
            <li>Pull requests include a clear description of changes</li>
          </ul>
        </div>
      </section>

      {/* Support */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#4ec9b0", fontSize: "1.75rem" }}>
          Support
        </h2>
        <div
          style={{
            background: "#252526",
            padding: "1.5rem",
            borderRadius: "4px",
          }}
        >
          <p style={{ color: "#d4d4d4", fontSize: "1rem", lineHeight: "1.6" }}>
            For issues, questions, or contributions:
          </p>
          <ul style={{ color: "#858585", paddingLeft: "1.5rem" }}>
            <li>
              <a
                href="https://github.com/bazokhan/react-custom-syntax/issues"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#4ec9b0", textDecoration: "none" }}
              >
                Report Issues on GitHub
              </a>
            </li>
            <li>
              <a
                href="https://www.npmjs.com/package/react-custom-syntax"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#4ec9b0", textDecoration: "none" }}
              >
                View on npm
              </a>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

