import { Reporter, TestCase, TestResult, FullResult } from '@playwright/test/reporter';
declare class ExtentReporter implements Reporter {
    private testResults;
    private startTime;
    private reportDir;
    constructor();
    onBegin(config: any): void;
    onTestBegin(test: TestCase): void;
    onTestEnd(test: TestCase, result: TestResult): void;
    onEnd(result: FullResult): void;
    private generateHtmlReport;
    private generateJsonReport;
    private createHtmlReport;
}
export default ExtentReporter;
//# sourceMappingURL=extent-reporter.d.ts.map