"use client"

export function HybeFooter() {
  const subsidiaries = [
    { name: "빅히트 뮤직", href: "#" },
    { name: "쏘스뮤직", href: "https://www.sourcemusic.com" },
    { name: "플레디스 엔터테인먼트", href: "http://www.pledis.co.kr" },
    { name: "위버스컴퍼니", href: "https://benx.co" },
    { name: "하이브 쓰리식스티", href: "#" },
    { name: "하이브 에듀", href: "#" },
    { name: "하이브 아이피엑스", href: "#" },
    { name: "수퍼브", href: "https://www.superbcorp.com" },
  ]

  const footerLinks = [
    { name: "쿠키 정책", href: "/cookie" },
    { name: "개인정보처리방침", href: "#" },
    { name: "HYBE 제보센터", href: "https://www.redwhistle.org/report/reportCheck.asp?organ=8230&leng=KO" },
    { name: "관련 사이트", href: "/related/site" },
  ]

  return (
    <footer className="bg-black text-white py-8 lg:py-12">
      <div className="container mx-auto px-4">
        <div className="space-y-6">
          {/* Copyright */}
          <p className="text-sm text-gray-400">© HYBE. All Rights Reserved</p>

          {/* Footer Navigation */}
          <div className="flex flex-wrap gap-4 lg:gap-8">
            {footerLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm hover:text-purple-400 transition-colors"
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Subsidiary Companies */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-300">관련 회사</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
              {subsidiaries.map((company) => (
                <a
                  key={company.name}
                  href={company.href}
                  className="text-xs hover:text-purple-400 transition-colors"
                  target={company.href.startsWith("http") ? "_blank" : undefined}
                  rel={company.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  {company.name}
                </a>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div className="pt-6 border-t border-gray-800 text-xs text-gray-500">
            <p>
              편리한 서비스 경험을 위해 필수적인 목적으로 쿠키를 사용하고 있습니다. 자세한{" "}
              <a href="/cookie" className="text-purple-400 hover:underline">
                쿠키 정책
              </a>
              은 별도로 확인하실 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
