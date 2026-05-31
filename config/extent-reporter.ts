import { Reporter, TestCase, TestResult, FullResult } from '@playwright/test/reporter';
import * as fs from 'fs';
import * as path from 'path';

class ExtentReporter implements Reporter {
  private testResults: any[] = [];
  private startTime: Date = new Date();
  private reportDir = './reports/extent';

  constructor() {
    // Ensure report directory exists
    if (!fs.existsSync(this.reportDir)) {
      fs.mkdirSync(this.reportDir, { recursive: true });
    }
  }

  onBegin(config: any) {
    console.log(`Starting test run at ${this.startTime.toISOString()}`);
  }

  onTestBegin(test: TestCase) {
    console.log(`Starting test: ${test.title}`);
  }

  onTestEnd(test: TestCase, result: TestResult) {
    const testResult = {
      title: test.title,
      status: result.status,
      duration: result.duration,
      errors: result.errors,
      attachments: result.attachments,
      retries: result.retry,
      startTime: result.startTime,
      project: test.titlePath()[0],
      file: test.location?.file,
      line: test.location?.line
    };

    this.testResults.push(testResult);
    
    console.log(`Test completed: ${test.title} - ${result.status}`);
  }

  onEnd(result: FullResult) {
    const endTime = new Date();
    const totalDuration = endTime.getTime() - this.startTime.getTime();

    const report = {
      summary: {
        startTime: this.startTime.toISOString(),
        endTime: endTime.toISOString(),
        totalDuration: totalDuration,
        totalTests: this.testResults.length,
        passed: this.testResults.filter(t => t.status === 'passed').length,
        failed: this.testResults.filter(t => t.status === 'failed').length,
        skipped: this.testResults.filter(t => t.status === 'skipped').length,
        timedOut: this.testResults.filter(t => t.status === 'timedout').length
      },
      tests: this.testResults
    };

    // Generate HTML report
    this.generateHtmlReport(report);
    
    // Generate JSON report
    this.generateJsonReport(report);

    console.log(`Test run completed. Total duration: ${totalDuration}ms`);
    console.log(`Results: ${report.summary.passed} passed, ${report.summary.failed} failed, ${report.summary.skipped} skipped`);
  }

  private generateHtmlReport(report: any) {
    const htmlContent = this.createHtmlReport(report);
    const reportPath = path.join(this.reportDir, 'extent-report.html');
    
    fs.writeFileSync(reportPath, htmlContent, 'utf8');
    console.log(`Extent HTML report generated: ${reportPath}`);
  }

  private generateJsonReport(report: any) {
    const reportPath = path.join(this.reportDir, 'extent-report.json');
    
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');
    console.log(`Extent JSON report generated: ${reportPath}`);
  }

  private stripAnsiCodes(text: string): string {
    // Remove ANSI escape codes using regex
    return text.replace(/\x1b\[[0-9;]*m/g, '');
  }

  private createHtmlReport(report: any): string {
    const { summary, tests } = report;
    
    return `
<!DOCTYPE html>
<html>
<head>
    <title>Extent Report - Playwright Test Results</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { background: #f5f5f5; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
        .summary { display: flex; gap: 20px; margin-bottom: 20px; }
        .summary-item { background: white; padding: 15px; border-radius: 5px; border: 1px solid #ddd; text-align: center; }
        .passed { color: green; }
        .failed { color: red; }
        .skipped { color: orange; }
        .test-item { background: white; margin: 10px 0; padding: 15px; border-radius: 5px; border: 1px solid #ddd; }
        .test-title { font-weight: bold; margin-bottom: 5px; }
        .test-status { padding: 2px 8px; border-radius: 3px; color: white; font-size: 12px; }
        .status-passed { background: #28a745; }
        .status-failed { background: #dc3545; }
        .status-skipped { background: #ffc107; }
        .status-timedout { background: #6f42c1; }
        .test-details { margin-top: 10px; font-size: 14px; color: #666; }
        .error { background: #f8d7da; padding: 10px; border-radius: 3px; margin-top: 10px; font-family: monospace; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Playwright Test Execution Report</h1>
        <p>Generated on: ${new Date().toLocaleString()}</p>
        <p>Total Duration: ${(summary.totalDuration / 1000).toFixed(2)} seconds</p>
    </div>

    <div class="summary">
        <div class="summary-item">
            <h3>Total Tests</h3>
            <div style="font-size: 24px; font-weight: bold;">${summary.totalTests}</div>
        </div>
        <div class="summary-item">
            <h3 class="passed">Passed</h3>
            <div style="font-size: 24px; font-weight: bold; color: green;">${summary.passed}</div>
        </div>
        <div class="summary-item">
            <h3 class="failed">Failed</h3>
            <div style="font-size: 24px; font-weight: bold; color: red;">${summary.failed}</div>
        </div>
        <div class="summary-item">
            <h3 class="skipped">Skipped</h3>
            <div style="font-size: 24px; font-weight: bold; color: orange;">${summary.skipped}</div>
        </div>
    </div>

    <h2>Test Results</h2>
    ${tests.map((test: any) => `
        <div class="test-item">
            <div class="test-title">${test.title}</div>
            <span class="test-status status-${test.status}">${test.status.toUpperCase()}</span>
            <div class="test-details">
                Duration: ${(test.duration / 1000).toFixed(2)}s | 
                Project: ${test.project} | 
                ${test.file ? `File: ${path.basename(test.file)}` : ''}
                ${test.line ? `Line: ${test.line}` : ''}
            </div>
            ${test.errors && test.errors.length > 0 ? `
                <div class="error">
                    <strong>Error:</strong>
                    <pre>${test.errors.map((e: any) => this.stripAnsiCodes(e.message || e)).join('\n')}</pre>
                </div>
            ` : ''}
        </div>
    `).join('')}
</body>
</html>`;
  }
}

export default ExtentReporter;
