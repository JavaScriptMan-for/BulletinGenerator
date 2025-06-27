import { FC, useEffect, useMemo, useCallback, useState } from 'react';
import "../sass/result_page.scss"
import { Link } from 'react-router-dom';
import { Links } from "@enums/Links.enum"

import { useMutation } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { RootState } from '@slices-my/store';

import { useAppDispatch } from '@slices-my/store';
import { addVariousInfoToServer } from '@slices-my/various_info.slice';
import { VariousInfoToServer } from '@types-my/Form.type';
import { FullInfo } from '@types-my/Fetch.type';

import wordImg from "/img/word.png"
import { useUnloadWarning } from '../hooks/useAlertUpload.hook';

const ResultPage: FC = () => {
    useUnloadWarning(true)

  const various_data = useSelector((state: RootState) => state.various_info.various_info_to_server);
  const dispatch = useAppDispatch();

  const [fortune, setFortune] = useState<number>(Math.floor(Math.random() * 999 + 1))
  
  const various_info = useSelector((state: RootState) => state.various_info.various_info);
  const general_info = useSelector((state: RootState) => state.general_info.general_info);

  useEffect(() => {
    const newData: VariousInfoToServer[] = [];

    for (let i = 0; i < various_info.length; i++) {
      const share_size = various_info[i].fraction === 'в доле' ? `${various_info[i].share_size_ch}/${various_info[i].share_size_z}` : `${various_info[i].share_size_ch} га`;
      const share_size_with_common_denominator = general_info.isShareWithCommon ? `${various_info[i].share_size_with_common_ch}/${various_info[i].share_size_with_common_z}` : '';

      const obj = {
        name: various_info[i].name,
        name_representative: various_info[i].name_representative,
        fraction: various_info[i].fraction,
        isRepresentative: various_info[i].isRepresentative,
        share_size,
        share_size_with_common_denominator,
      };

    for (let j = 0; j <= general_info.number_questions; j++) {
  const number_day = j == general_info.number_questions ? '____' : j + 1;
  newData.push({ ...obj, number_day });
  }
    }
    dispatch(addVariousInfoToServer(newData));
  }, [various_info, general_info, dispatch]);

  const req_body = useMemo(() => {
    return {
      general_info,
      various_info: various_data
    };
  }, [general_info, various_data]);

  const mutation = useMutation({
    onSuccess: () => {
    const end: HTMLAudioElement = new Audio();
    const end_src = `${import.meta.env.BASE_URL}audio/end.mp3`;
    end.src = end_src;
    end.volume = 0.3

    if(!mutation.isPending && !mutation.isError) {
      end.play();
    }
    },
    mutationKey: ['docx'],
    mutationFn: async (data: FullInfo): Promise<Blob | undefined> => {
      const res = await fetch('/api/redact', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          "Content-Type": 'application/json'
        }
      });

      let req: any;

      const contentType = res.headers.get("Content-Type");

        if (contentType && contentType.includes("application/json")) {
           req = await res.json(); 
          if(!res.ok) throw new Error(req.message)
        } else if (contentType && contentType.includes("application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
          req = await res.blob(); 
          return req
        } else {
            throw new Error("Ошибка, связанная с неожиданным типом данных");
        }
    }
  });

  const safeMutate = useCallback(mutation.mutate, [mutation.mutate]);

  useEffect(() => {
    if (general_info && various_info && various_data) {
      safeMutate(req_body);
    }
  }, [general_info, various_info, various_data, safeMutate, req_body]);
  


   const handleDownload = useCallback(async ():Promise<void> => {
    try {
      const blob = await mutation.mutateAsync(req_body);

      if(!blob) throw new Error('Ошибка')

      setFortune(Math.floor(Math.random() * 999 + 1));
      const url = window.URL.createObjectURL(blob); 
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `bullet-${fortune}.docx`);
      document.body.appendChild(link);
      link.style.display = 'none'; 
      link.click();
      window.URL.revokeObjectURL(url); 
      document.body.removeChild(link);
    } catch (error: any) {
      console.error('Error downloading document:', error.message);
    }
  }, [mutation, req_body]);

  const handleBack = () => {
      document.location.pathname = '/';

        localStorage.removeItem('day');
        localStorage.removeItem('mouth');
        localStorage.removeItem('year');
        localStorage.removeItem('c_1');
        localStorage.removeItem('c_2');
        localStorage.removeItem('c_3');
        localStorage.removeItem('c_y');
        localStorage.removeItem('area');
        localStorage.removeItem('address');
        localStorage.removeItem('number_quest');
  }

  return (
    <>
      <h1 style={{marginLeft: "30px"}}>Финальный этап</h1>
      <div id="finally">
           <div id="info_file">
        <img width={48} src={wordImg} alt="Word Document" />
        <span>bullet-{fortune}.docx</span>
      </div>
     
     <button id='download' disabled={mutation.isError || mutation.isPending} onClick={handleDownload}>{mutation.isPending ? 'Генерация...' : 'Скачать'}</button>
      <p className='validate_error'>{mutation.error && mutation.error.message}</p>
      </div>

      {!mutation.isError && <span style={{marginLeft: '0px', textAlign: 'center'}}>Ваши бюллетени успешно сгенерировались. В случае каких-либо неисправностей прошу Вас написать нам 
      сюда: <code>ivan.minevskiy@yandex.ru</code> .
      </span>}
      <div className='center'><Link onClick={handleBack} to={Links.MAIN_PAGE}>Вернуться назад</Link></div>
    </>
  );
};

export default ResultPage;