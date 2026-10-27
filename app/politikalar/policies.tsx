import type { ReactNode } from "react";

export type Policy = {
  slug: string;
  title: string;
  shortTitle: string;
  docNo: string;
  publishedAt: string;
  revision: string;
  description: string;
  signature: { company?: string; name?: string; title: string };
  content: ReactNode;
};

const COMPANY = "GÖZÜTOK METAL MÜHENDİSLİK MAKİNA İNŞAAT TEK.SAN.TİC.LTD. ŞTİ.";

export const POLICIES: Policy[] = [
  {
    slug: "entegre-politika",
    title: "Entegre Politika",
    shortTitle: "Entegre Politika",
    docNo: "GZT.POL.01",
    publishedAt: "12.01.2026",
    revision: "00",
    description:
      "Kalite (ISO 9001), Çevre (ISO 14001) ve İş Sağlığı ve Güvenliği (ISO 45001) Yönetim Sistemlerini kapsayan entegre politikamız.",
    signature: { title: "Genel Müdür" },
    content: (
      <>
        <p>Firmamız ofis ve saha faaliyetlerinde sektörün öncü ve güvenilir kuruluşu olarak; Kalite (ISO 9001), Çevre (ISO 14001) ve İş Sağlığı ve Güvenliği (ISO 45001) Yönetim Sistemlerini bir bütün olarak uygulamayı ve sürekli iyileştirmeyi,</p>
        <p>Bu doğrultuda;</p>
        <ul>
          <li><strong>Müşteri ve Standart Odaklılık:</strong> Firma faaliyetleri ile ilgili standartlarına uygun yüksek kalitede ürün ve hizmet sunarak müşteri memnuniyetini en üst seviyede tutmayı,</li>
          <li><strong>Yasal ve İklimsel Uyum:</strong> Faaliyet gösterdiğimiz tüm alanlarda ulusal ve uluslararası çevre, İSG ve iklim değişikliği ile ilgili yasal mevzuatlara, standartlara ve üye olunan kuruluşların şartlarına eksiksiz uymayı,</li>
          <li><strong>İklim Değişikliği ve Karbon Ayak İzi Yönetimi:</strong> Firma faaliyeti süreçlerinde sera gazı emisyonlarını ve karbon ayak izimizi azaltmayı; iklim değişikliğiyle mücadele doğrultusunda enerji verimliliğini artırmayı, yenilenebilir ve temiz enerji kaynaklarına odaklanmayı,</li>
          <li><strong>Çevrenin Korunması ve Sürdürülebilirlik:</strong> Üretim süreçlerinde ortaya çıkan emisyon, koku, atık ve gürültü etkilerini kontrol altında tutmayı; küresel ısınmaya yol açan kaynak tüketimini (yakıt, elektrik, su) optimize etmeyi, döngüsel ekonomi anlayışıyla atıkları kaynağında azaltmayı ve geri dönüşümü teşvik etmeyi,</li>
          <li><strong>İSG ve Sıfır Kaza Hedefi:</strong> Yüksek sıcaklıkta çalışma, ağır iş makineleri ve kimyasal kullanımı içeren süreçlerde güvenli çalışma koşulları sağlamayı; iş kazalarını ve meslek hastalıklarını önlemek için tehlikeleri kaynağında yok etmeyi ve riskleri azaltmayı,</li>
          <li><strong>Katılım ve Bilinçlendirme:</strong> Çalışanlarımızın, çalışan temsilcilerimizin ve tedarikçilerimizin İSG, çevre ve iklim değişikliği farkındalığını artırmayı; tüm süreçlerde aktif katılımlarını desteklemeyi,</li>
          <li><strong>Sürekli İyileştirme:</strong> Entegre Yönetim Sistemi performansımızı, iklim hedeflerimizi ve operasyonel süreçlerimizi düzenli olarak gözden geçirerek sistemin etkinliğini sürekli artırmayı,</li>
        </ul>
        <p><strong>TAAHHÜT EDERİZ.</strong></p>
      </>
    ),
  },
  {
    slug: "bilgi-guvenligi-politikasi",
    title: "Bilgi Güvenliği Politikası",
    shortTitle: "Bilgi Güvenliği",
    docNo: "POL.01",
    publishedAt: "12.01.2026",
    revision: "00",
    description:
      "Fiziksel ve elektronik bilgi varlıklarının gizliliğini, bütünlüğünü ve erişilebilirliğini korumaya yönelik bilgi güvenliği politikamız.",
    signature: { company: COMPANY, name: "ADEM TANRIÖVER", title: "Genel Müdür" },
    content: (
      <>
        <p>Firmamız “Depozito İade Makinaları ve Güneş Kollektörlerinin Üretimi” alanında hizmet vermektedir. Firmamız gizlilik, bütünlük ve tüm fiziksel ve elektronik bilgi varlıklarını korumayı taahhüt etmektedir. Bilgi ve bilgi güvenliği gereksinimleri kurumsal hedeflerimiz ile aynı doğrultuda olacaktır. Firmamız yönetimi değişime açık, iyi eğitim almış, konusunda yetkin personel istihdamı sağlayacak ve sektör içerisinde rakiplerimizle rekabeti sağlayacak finansmanı sağlamak, yeterli donanım ve altyapıyı bulunduracaktır. Bu altyapı ve personel ile birlikte gerekli finansmanda sağlanacaktır. İş sürekliliği ve acil durum planları, veri yedekleme prosedürleri, virüslerden ve bilgisayar korsanlarından sakınma, erişim kontrol sistemleri ve bilgi güvenliği ihlal bildirimi temel faaliyetlerimizin temel taşlarını oluşturacaktır. Yapılan risk değerlendirmeleri sonucunda elde edilen açıklıklar ve tehditler bertaraf edilerek müşteri ve personelimizin bilgilerine güvenli erişim sağlanacaktır.</p>
        <p>Ayrıca risk değerlendirmeleri sonucunda amaçlarımızı belirleyip bu amaçlarım başarılması için gerekli olan kaynaklar ve şartlar sağlanacaktır.</p>
        <p>Bu politikayı gerçekleştirmek için başta çalışanlarımızın Bilgi Güvenliği Yönetim Sistemi şartlarını çalışma biçimi haline getirmelerini beklemekteyiz. Tüm personel ve belirli üçüncü tarafların Bilgi Güvenliği Yönetim Sistemi ile ilgili uygun eğitimleri alması sağlanacaktır.</p>
        <p>Bilgi güvenliği ile ilgili uygulanabilir şartlar ve bu şartların getirdiği fırsatlar ve gereklilikler yerine getirilecek ve bu şartlar sürekli iyileştirilecektir. Ayrıca firmamızın, personelimizin ve tüm ilgili tarafların bu sisteme adaptasyonu sağlanacaktır.</p>
        <p>Bilgi Güvenliği Politikamız yılda bir kez ya da firmamızla ilgili önemli değişikliklerin olması durumunda uygunluğunu, doğruluğunu ve etkinliğini sağlamak için yönetim ve birim sorumlularının katılımıyla gözden geçirilmekte ve güncelliği sağlanmaktadır.</p>
      </>
    ),
  },
  {
    slug: "hys-politikasi",
    title: "HYS Politikası",
    shortTitle: "HYS Politikası",
    docNo: "POL.17",
    publishedAt: "12.01.2026",
    revision: "00",
    description:
      "ISO/IEC 20000-1 ile uyumlu Hizmet Yönetim Sistemi (HYS) politikamız.",
    signature: { company: COMPANY, name: "ADEM TANRIÖVER", title: "Genel Müdür" },
    content: (
      <ul>
        <li>Sürekli olarak Hizmet Yönetimi Sistemi’nin etkinliğini iyileştirmek,</li>
        <li>Var olan süreçleri zenginleştirmek için ISO/IEC 20000-1 ile paralel hale getirmek,</li>
        <li>Hizmet Yönetim Sisteminin sürdürülebilir olmasını sağlamak,</li>
        <li>Bilgi Teknolojileri Hizmetlerini ölçülebilir kılmak ve gözden geçirmek,</li>
        <li>Müşterilerden gelen bildirimleri değerlendirmek, çıkarımlar yaparak geri bildirimlerde bulunmak.</li>
      </ul>
    ),
  },
  {
    slug: "cerez-politikasi",
    title: "Çerez Politikası",
    shortTitle: "Çerez Politikası",
    docNo: "POL.15",
    publishedAt: "12.01.2026",
    revision: "00",
    description:
      "Web sitemizde hangi çerezleri, hangi amaçla kullandığımız ve çerez ayarlarınızı nasıl değiştirebileceğiniz hakkında bilgilendirme.",
    signature: { company: COMPANY, name: "ADEM TANRIÖVER", title: "Genel Müdür" },
    content: (
      <>
        <p>Biz, {COMPANY} olarak güvenliğinize önem veriyor ve bu Çerez Politikası ile siz sevgili ziyaretçilerimizi, web sitemizde hangi çerezleri, hangi amaçla kullandığımız ve çerez ayarlarınızı nasıl değiştireceğiniz konularında kısaca bilgilendirmeyi hedefliyoruz.</p>
        <p>Sizlere daha iyi hizmet verebilmek adına, çerezler vasıtasıyla, ne tür kişisel verilerinizin hangi amaçla toplandığı ve nasıl işlendiği konularında, kısaca bilgi sahibi olmak için lütfen bu Çerez Politikasını okuyunuz. Daha fazla bilgi için Gizlilik Politikamıza göz atabilir ya da bizlerle çekinmeden iletişime geçebilirsiniz.</p>

        <h2>Çerez Nedir?</h2>
        <p>Çerezler, kullanıcıların web sitelerini daha verimli bir şekilde kullanabilmeleri adına, cihazlarına kaydedilen küçük dosyacıklardır. Çerezler vasıtasıyla kullanıcıların bilgilerinin işleniyor olması sebebiyle, 6698 sayılı Kişisel Verilerin Korunması Kanunu, gereğince, kullanıcıların bilgilendirilmeleri ve onaylarının alınması gerekmektedir.</p>
        <p>Bizler de siz sevgili ziyaretçilerimizin, web sitemizden en verimli şekilde yararlanabilmelerini ve siz sevgili ziyaretçilerimizin kullanıcı deneyimlerinin geliştirilebilmesini sağlamak adına, çeşitli çerezler kullanmaktayız.</p>

        <h3>1. Zorunlu Çerezler</h3>
        <p>Zorunlu çerezler, web sitesine ilişkin temel işlevleri etkinleştirerek web sitesinin kullanılabilir hale gelmesini sağlayan çerezlerdir. Web sitesi bu çerezler olmadan düzgün çalışmaz.</p>

        <h3>2. Performans Çerezleri</h3>
        <p>Performans çerezleri, ziyaretçilerin web sitesine ilişkin kullanım bilgilerini ve tercihlerini anonim olarak toplayan ve bu sayede web sitesinin performansının geliştirilmesine olanak sağlayan çerezlerdir.</p>

        <h3>3. Fonksiyonel Çerezler</h3>
        <p>Fonksiyonel çerezler, kullanıcıların web sitesine ilişkin geçmiş kullanımlarından yola çıkılarak gelecekteki ziyaretlerinde tanınmalarını ve hatırlanmalarını sağlayan ve bu sayede web sitelerinin kullanıcılara dil, bölge vb. gibi kişiselleştirilmiş bir hizmet sunmasına olanak tanıyan çerezlerdir.</p>

        <h3>4. Reklam Çerezleri</h3>
        <p>Reklam çerezleri, üçüncü taraflara ait çerezlerdir ve web sitelerinde ziyaretçilerin davranışlarını izlemek için kullanılırlar. Bu çerezlerin amaçları, ziyaretçilerin ihtiyaçlarına yönelik ilgilerini çekecek reklamların gösterilmesine yardımcı olmaktır ve sorumluluğu çerez sahibi üçüncü taraflara aittir.</p>

        <h2>Çerezler İle İşlenen Kişisel Veriler Nelerdir?</h2>
        <p>Kimlik (isim, soy isim, doğum tarihi vb.) ve iletişim (adres, e-posta adresi, telefon, IP, konum vb.) bilgileriniz tarafımızca, çerezler (cookies) vasıtasıyla, otomatik veya otomatik olmayan yöntemlerle ve bazen de analitik sağlayıcılar, reklam ağları, arama bilgi sağlayıcıları, teknoloji sağlayıcıları gibi üçüncü taraflardan elde edilerek, kaydedilerek, depolanarak ve güncellenerek, aramızdaki hizmet ve sözleşme ilişkisi çerçevesinde ve süresince, meşru menfaat işleme şartına dayanılarak işlenecektir.</p>

        <h2>Çerezler Hangi Amaçla Kullanılmaktadır?</h2>
        <p>Web sitemizde, şüpheli eylemlerin tespiti yoluyla güvenliğin sağlanması, kullanıcıların tercihleri doğrultusunda işlevsellik ve performansın artırılması, ürünlerin ve hizmetlerin geliştirilmesi ve kişiselleştirilmesi ile bu hizmetlere ulaşımın kolaylaştırılması, sözleşmesel ve hukuki sorumlulukların yerine getirilmesi amaçlı çerezler kullanmaktadır. Ayrıca kullanıcıların daha geniş kapsamlı hizmet sağlayıcılar ile buluşturulabilmesi amacıyla reklam çerezleri ve üçüncü taraflarla bilgi paylaşımı da söz konusudur.</p>

        <h2>Çerezler Nasıl Yönetilmektedir?</h2>
        <p>Tüm bu açıklamalardan sonra, hangi çerezlerin kullanılacağı konusu, tamamen kullanıcılarımızın özgür iradelerine bırakılmıştır. Çerez tercihlerinizi, tarayıcınızın ayarlarından silerek ya da engelleyerek, web sitemize adım attığınız anda yönetebilir ya da gelecekte, istediğiniz zaman bu ayarları değiştirebilirsiniz. Daha ayrıntılı bilgi için Gizlilik Politikamıza göz atabilir ya da bizlerle <a href="mailto:info@gozutokmetal.com.tr">info@gozutokmetal.com.tr</a> e-mail adresi üzerinden iletişime geçebilirsiniz.</p>
      </>
    ),
  },
];

export function getPolicy(slug: string) {
  return POLICIES.find((policy) => policy.slug === slug);
}
