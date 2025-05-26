import IconCertified from '@/assets/icons/IconCertified.svg?react';
import IconMenuHeart from '@/assets/icons/IconMenuHeart.svg?react';
import IconComment from '@/assets/icons/IconComment.svg?react';
import { motion } from 'framer-motion';

const DUMMY_DATA = [
  {
    id: 1,
    writerName: '동아리연합회',
    isCertified: true,
    temperature: '99',
    title: '영상 제작 재능기부자 찾아요!',
    tags: ['모집중', '재능기부', '영상'],
    heartNum: 15,
    commentNum: 17,
  },
  {
    id: 2,
    writerName: '동동',
    isCertified: false,
    temperature: '34',
    title: '카드뉴스 제작자 찾아요 :)',
    tags: ['모집중', '유료작업', '디자인'],
    heartNum: 8,
    commentNum: 5,
  },
  {
    id: 3,
    writerName: '아코',
    isCertified: false,
    temperature: '80',
    title: '웹사이트 개발자 찾아요.',
    tags: ['마감', '유료작업', '코딩'],
    heartNum: 20,
    commentNum: 19,
  },
];

const TAG_COLORS = {
  모집중: '#F5179A',
  재능기부: '#B281F4',
  유료작업: '#B281F4',
  영상: '#53BDF5',
  코딩: '#53BDF5',
  디자인: '#53BDF5',
  마감: '#666666',
} as const;

export default function TabAll() {
  const ARTICLE_HOVER_SCALE = 1.01;
  const ARTICLE_HOVER_DURATION = 0.2;

  return (
    <>
      {DUMMY_DATA.map((item) => (
        <Article key={item.id}>
          <ArticleImage src="https://picsum.photos/200/300" />
          <ArticleContent>
            <ArticleWriter
              writerName={item.writerName}
              isCertified={item.isCertified}
              temperature={item.temperature}
            />
            <ArticleTitleAndTags title={item.title} tags={item.tags} />
            <ArticleStats>
              <Stats icon={IconMenuHeart} num={item.heartNum} />
              <Stats icon={IconComment} num={item.commentNum} />
            </ArticleStats>
          </ArticleContent>
        </Article>
      ))}
    </>
  );

  function Article({ children }: { children: React.ReactNode }) {
    return (
      <motion.div
        className="flex gap-4 border-b border-b-gray-50/20 py-4 w-full last:border-b-0 cursor-pointer"
        whileHover={{
          scale: ARTICLE_HOVER_SCALE,
        }}
        transition={{
          duration: ARTICLE_HOVER_DURATION,
        }}
      >
        {children}
      </motion.div>
    );
  }

  function ArticleImage({ src }: { src: string }) {
    return (
      <img
        src={src}
        alt="article-image"
        className="rounded-xl w-[120px] h-[120px] object-cover flex-shrink-0"
      />
    );
  }
  function ArticleContent({ children }: { children: React.ReactNode }) {
    return <div className="flex flex-col gap-2 flex-1 min-w-0">{children}</div>;
  }
  function ArticleWriter({
    writerName,
    isCertified,
    temperature,
  }: {
    writerName: string;
    isCertified: boolean;
    temperature: string;
  }) {
    return (
      <div className="flex items-center gap-1">
        <h3 className="text-md truncate">{writerName}</h3>
        {isCertified && <IconCertified className="size-4 flex-shrink-0" />}
        <span className={`text-sm text-gray-400 ${!isCertified ? 'ml-1' : ''}`}>
          {temperature}°C
        </span>
      </div>
    );
  }
  function ArticleTitleAndTags({
    title,
    tags,
  }: {
    title: string;
    tags: string[];
  }) {
    return (
      <>
        <h3 className="text-lg font-semibold truncate">{title}</h3>
        <div className="flex gap-2 flex-nowrap overflow-x-scroll scrollbar-hide">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 rounded-md text-sm flex-shrink-0"
              style={{
                backgroundColor: TAG_COLORS[tag as keyof typeof TAG_COLORS],
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </>
    );
  }
  function ArticleStats({ children }: { children: React.ReactNode }) {
    return <div className="flex items-center gap-4 mt-auto">{children}</div>;
  }
  function Stats({
    icon: Icon,
    num,
  }: {
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    num: number;
  }) {
    return (
      <div className="flex items-center gap-1">
        <Icon className="size-5" />
        <span className="text-sm">{num}</span>
      </div>
    );
  }
}
