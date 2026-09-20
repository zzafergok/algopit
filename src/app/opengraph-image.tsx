import { ImageResponse } from 'next/og';
import { SITE_NAME } from '@/lib/seo';

export const alt = 'AlgoPit - Algoritmalar & İnteraktif Görselleştirme';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        backgroundColor: '#0b0807',
        backgroundImage:
          'radial-gradient(circle at 25px 25px, #1d1612 2%, transparent 0%), radial-gradient(circle at 75px 75px, #140f0c 2%, transparent 0%)',
        backgroundSize: '100px 100px',
        padding: '80px',
        border: '16px solid #140f0c',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          borderBottom: '2px solid #33261f',
          paddingBottom: '32px',
          width: '100%',
        }}
      >
        <div
          style={{
            width: '48px',
            height: '48px',
            backgroundColor: '#00f0d4',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0b0807',
            fontWeight: 900,
            fontSize: '28px',
          }}
        >
          A
        </div>
        <div
          style={{
            fontSize: '36px',
            fontWeight: 800,
            color: '#f7f2ea',
            letterSpacing: '-0.02em',
          }}
        >
          {SITE_NAME}
        </div>
        <div
          style={{
            marginLeft: 'auto',
            fontSize: '18px',
            color: '#00f0d4',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          v1.0 // INTERACTIVE_RUNTIME
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          maxWidth: '900px',
        }}
      >
        <div
          style={{
            fontSize: '64px',
            fontWeight: 900,
            color: '#f7f2ea',
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
          }}
        >
          Algoritmalar &amp; İnteraktif Görselleştirme
        </div>
        <div
          style={{
            fontSize: '24px',
            color: '#a69689',
            lineHeight: 1.4,
          }}
        >
          Sıralama, graf, dinamik programlama ve veri yapılarını modern
          animasyonlar ve adım adım yürütme ile öğrenin.
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '16px',
          width: '100%',
        }}
      >
        {[
          'Sıralama',
          'Graflar',
          'Dinamik Programlama',
          'Veri Yapıları',
          'Geometri',
        ].map((tag) => (
          <div
            key={tag}
            style={{
              backgroundColor: '#1d1612',
              border: '1px solid #33261f',
              padding: '8px 20px',
              fontSize: '18px',
              color: '#00f0d4',
              fontWeight: 600,
            }}
          >
            #{tag}
          </div>
        ))}
      </div>
    </div>,
    {
      ...size,
    },
  );
}
