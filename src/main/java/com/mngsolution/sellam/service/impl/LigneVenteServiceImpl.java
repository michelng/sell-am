package com.mngsolution.sellam.service.impl;

import com.mngsolution.sellam.domain.LigneVente;
import com.mngsolution.sellam.repository.LigneVenteRepository;
import com.mngsolution.sellam.service.LigneVenteService;
import com.mngsolution.sellam.service.dto.LigneVenteDTO;
import com.mngsolution.sellam.service.mapper.LigneVenteMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link LigneVente}.
 */
@Service
@Transactional
public class LigneVenteServiceImpl implements LigneVenteService {

    private final Logger log = LoggerFactory.getLogger(LigneVenteServiceImpl.class);

    private final LigneVenteRepository ligneVenteRepository;

    private final LigneVenteMapper ligneVenteMapper;

    public LigneVenteServiceImpl(LigneVenteRepository ligneVenteRepository, LigneVenteMapper ligneVenteMapper) {
        this.ligneVenteRepository = ligneVenteRepository;
        this.ligneVenteMapper = ligneVenteMapper;
    }

    @Override
    public LigneVenteDTO save(LigneVenteDTO ligneVenteDTO) {
        log.debug("Request to save LigneVente : {}", ligneVenteDTO);
        LigneVente ligneVente = ligneVenteMapper.toEntity(ligneVenteDTO);
        ligneVente = ligneVenteRepository.save(ligneVente);
        return ligneVenteMapper.toDto(ligneVente);
    }

    @Override
    public LigneVenteDTO update(LigneVenteDTO ligneVenteDTO) {
        log.debug("Request to update LigneVente : {}", ligneVenteDTO);
        LigneVente ligneVente = ligneVenteMapper.toEntity(ligneVenteDTO);
        ligneVente = ligneVenteRepository.save(ligneVente);
        return ligneVenteMapper.toDto(ligneVente);
    }

    @Override
    public Optional<LigneVenteDTO> partialUpdate(LigneVenteDTO ligneVenteDTO) {
        log.debug("Request to partially update LigneVente : {}", ligneVenteDTO);

        return ligneVenteRepository
            .findById(ligneVenteDTO.getId())
            .map(existingLigneVente -> {
                ligneVenteMapper.partialUpdate(existingLigneVente, ligneVenteDTO);

                return existingLigneVente;
            })
            .map(ligneVenteRepository::save)
            .map(ligneVenteMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<LigneVenteDTO> findAll() {
        log.debug("Request to get all LigneVentes");
        return ligneVenteRepository.findAll().stream().map(ligneVenteMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<LigneVenteDTO> findOne(Long id) {
        log.debug("Request to get LigneVente : {}", id);
        return ligneVenteRepository.findById(id).map(ligneVenteMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete LigneVente : {}", id);
        ligneVenteRepository.deleteById(id);
    }
}
