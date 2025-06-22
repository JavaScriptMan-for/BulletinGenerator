import { FC, useEffect, useMemo, useCallback } from 'react';
import "../sass/result_page.scss"

import { useMutation } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { RootState } from '@slices-my/store';

import { useAppDispatch } from '@slices-my/store';
import { addVariousInfoToServer } from '@slices-my/various_info.slice';
import { VariousInfoToServer } from '@types-my/Form.type';
import { FullInfo } from '@types-my/Fetch.type';

const ResultPage: FC = () => {
  const various_data = useSelector((state: RootState) => state.various_info.various_info_to_server);
  const dispatch = useAppDispatch();

  const various_info = useSelector((state: RootState) => state.various_info.various_info);
  const general_info = useSelector((state: RootState) => state.general_info.general_info);

  useEffect(() => {
    const newData: VariousInfoToServer[] = [];

    for (let i = 0; i < various_info.length; i++) {
      const share_size = various_info[i].fraction === 'в доле' ? `${various_info[i].share_size_ch}/${various_info[i].share_size_z}` : `${various_info[i].share_size_ch} га`;
      const share_size_with_common_denominator = `${various_info[i].share_size_with_common_ch}/${various_info[i].share_size_with_common_z}`;

      const obj = {
        name: various_info[i].name,
        name_representative: various_info[i].name_representative,
        fraction: various_info[i].fraction,
        isRepresentative: various_info[i].isRepresentative,
        share_size,
        share_size_with_common_denominator,
      };

      for (let j = 0; j < general_info.number_questions; j++) {
        newData.push({ ...obj, number_day: j });
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
           req = res.json(); 
          if(!res.ok) throw new Error(req.message)
        } else if (contentType && contentType.includes("application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
          req = res.blob(); 
          return req
        } else {
            throw new Error("Unexpected content type");
        }



    }
  });

  const safeMutate = useCallback(mutation.mutate, [mutation.mutate]);

  useEffect(() => {
    if (general_info && various_info && various_data) {
      safeMutate(req_body);
    }
  }, [general_info, various_info, various_data, safeMutate, req_body]);
  


   const handleDownload = useCallback(async () => {
    try {
      const blob = await mutation.mutateAsync(req_body);

      if(!blob) throw new Error('Ошибка')

      const url = window.URL.createObjectURL(blob); // Use window.URL
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'document.docx'); // Use setAttribute
      document.body.appendChild(link);
      link.style.display = 'none'; // Hide the link
      link.click();
      window.URL.revokeObjectURL(url);  // Use window.URL
      document.body.removeChild(link);
    } catch (error: any) {
      console.error('Error downloading document:', error.message);
    }
  }, [mutation, req_body]);

  return (
    <>
      <h1>Финальный этап</h1>
      <p>{mutation.error && mutation.error.message}</p>
      <button disabled={mutation.isError} onClick={handleDownload}>Скачать</button>
    </>
  );
};

export default ResultPage;