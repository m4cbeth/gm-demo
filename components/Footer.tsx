export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#2e363a] text-white py-6">
            <div className="container mx-auto px-4">
                <div>
                    <p className="text-gray-400 my-3">
                        iA Private Wealth Inc. is a member of the Canadian Investor Protection Fund and the Canadian Investment Regulatory Organization. iA Private Wealth is a trademark and a business name under which iA Private Wealth Inc. operates.
                    </p>
                    <p className="text-gray-400 my-3">
                        This is not an official website or publication of iA Private Wealth and the information and opinions contained herein do not necessarily reflect the opinion of iA Private Wealth. The particulars contained on this website were obtained from various sources which are believed to be reliable, but no representation or warranty, express or implied, is made by iA Private Wealth, its affiliates, employees, agents or any other person as to its accuracy, completeness or correctness. Furthermore, this website is provided for information purposes only and is not construed as an offer or solicitation for the sale or purchase of securities. The information contained herein may not apply to all types of investors. The Investment Advisor can open accounts only in the provinces where they are registered.
                    </p>
                    <p className="text-gray-400 my-3">
                        Products and services provided by third parties, including by way of referral, are fully independent of those provided by iA Private Wealth Inc.  Products offered directly through iA Private Wealth Inc. are covered by the Canadian Investor Protection Fund, subject to exception. iA Private Wealth Inc. does not warrant the quality, reliability or accuracy of the products or services of third parties. Please speak to your advisor if you have any questions.
                    </p>
                </div>
                <div className="text-center">
                    <p className="font-sans text-md font-thin" >
                        © {currentYear} Sensible Wealth Advisory Group
                    </p>
                </div>
            </div>
        </footer>
    );
}

